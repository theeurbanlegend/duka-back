import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Document, Model, ObjectId } from 'mongoose';
import { createUserDto } from 'src/dto';
import { jwtConstants } from './constants';
interface UserDocument extends Document {
  name: string;
  phone: string;
  recovery_email?: string;
  password: string;
}
@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<Document>,
    private jwtService: JwtService,
  ) {}
  async register(userDto: createUserDto): Promise<{ accessToken: string }> {
    const hashedPass = await bcrypt.hash(userDto.password, 10);
    userDto.password = hashedPass;
    const newUser = new (this.userModel as Model<
      Document & { _doc: createUserDto }
    >)({
      ...userDto,
    });
    const result = await newUser.save();
    delete result._doc.password;
    const payload = { sub: result._id, username: result._doc.name, phone:result._doc.phone };
    return {
      accessToken: await this.jwtService.signAsync(payload,{secret:jwtConstants.secret, expiresIn:'10d'})
    };
  }
  async signin(
    phone: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const foundUser = (await this.userModel.findOne({ phone })) as UserDocument;
    if (!foundUser) throw new NotFoundException('An error occured!');
    const isValidLogin = await bcrypt.compare(password, foundUser.password);
    if (!isValidLogin)
      throw new UnauthorizedException('Incorrect credentials!');
    delete foundUser['password'];
    const payload = { sub: foundUser._id, username: foundUser.name, phone:foundUser.phone };
    return {
      accessToken: await this.jwtService.signAsync(payload,{secret:jwtConstants.secret, expiresIn:'10d'})
    };
  }
  async editDetails(
    userId: ObjectId,
    password: string,
  ): Promise<{ accessToken: string }> {
    const foundUser:UserDocument|null = await this.userModel.findById(userId) 
    if (!foundUser) {
      throw new NotFoundException('An error occured!');
    }
    const hashedPass = await bcrypt.hash(password, 10);
    foundUser.set({ password: hashedPass });
    await foundUser.save();
    const payload = { sub: foundUser._id, username: foundUser.name, phone:foundUser.phone };
    
    return {
      accessToken: await this.jwtService.signAsync(payload,{secret:jwtConstants.secret, expiresIn:'10d'})
    };
  }
}
