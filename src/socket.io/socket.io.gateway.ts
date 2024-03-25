import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { OnGatewayConnection, OnGatewayDisconnect,  SubscribeMessage,  WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BarcodeService } from 'src/barcode/barcode.service';

const corsOptions: CorsOptions = {
  origin: '*', // Allow all origins (adjust for production)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow cookies for authentication (if applicable)
};

@WebSocketGateway({cors:corsOptions})

export class SocketIoGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private barcodeService:BarcodeService){}
  @WebSocketServer() private server: Server;

  
  handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected`);
  }

  
  @SubscribeMessage('barcode')
  async handleBarcodeEvent(client: Socket, barcode: string) {
    console.log(`Client ${client.id} sent barcode: ${barcode}`);
    const { variants } = await this.barcodeService.getBarcodeDetails(barcode);
    this.server.to('barcodeRoom').emit('obtainedBarcodeDetails', { variants, message: barcode });
  }

  // Create a room for barcode messages and add clients named "receiver" and "sender"
  handleConnection(client: Socket) {
    console.log(`Client ${client.id} connected`);

    client.on('joinRoom', (role: string) => {
      if (role === 'sender') {
        client.join('barcodeRoom');
      } else if (role === 'receiver') {
        client.join('barcodeRoom');
      }
    });
  }
}
