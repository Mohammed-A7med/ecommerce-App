import puppeteer from 'puppeteer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { password } = await request.json();
  
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Navigate to the password page
    await page.goto('https://kalles-5.myshopify.com/password');
    
    // Fill in the password
    await page.type('input[name="password"]', password);
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Wait for navigation
    await page.waitForNavigation();
    
    // Get cookies
    const cookies = await page.cookies();
    
    // Navigate to products.json
    await page.goto('https://kalles-5.myshopify.com/products.json');
    
    // Get the JSON content
    const content = await page.content();
    const jsonMatch = content.match(/<pre>(.*?)<\/pre>/s);
    
    if (jsonMatch) {
      const productsData = JSON.parse(jsonMatch[1]);
      await browser.close();
      
      return NextResponse.json({
        success: true,
        products: productsData.products,
      });
    }
    
    throw new Error('Could not extract products');
  } catch (error) {
    await browser.close();
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}