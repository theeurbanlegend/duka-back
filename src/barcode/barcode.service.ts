import { Global, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable({})
export class BarcodeService {
  async getBarcodeDetails(barCode: string) {
    try {
      // Make an HTTP request to fetch the HTML content
      const response = await axios.get(
        `https://barcode-list.com/barcode/EN/Search.htm?barcode=${barCode}`,
      );
      const html = response.data;
      // Parse the HTML content using cheerio
      const $ = cheerio.load(html);

      // Extract data from meta tags
      const metaTags = $('meta');

      // Select meta tags with name="description"
      const metaDescription = $('meta[name="description"]');

      // Extract content from the first meta tag (assuming there's only one)
      const description = metaDescription.attr('content');

      const productsIndex = description.indexOf('products:') + 'products:'.length;
      const variantsString = description.substring(productsIndex).trim();
      
      // Split variants into an array
      const variants = variantsString.split(';').map(variant => variant.trim());
      if(variants[0]=="") return {"variants":null}
      return {"variants":variants}
    } catch (error) {
      console.error('Error fetching barcode details:', error);
      throw new Error('Failed to fetch barcode details');
    }
  }
}
