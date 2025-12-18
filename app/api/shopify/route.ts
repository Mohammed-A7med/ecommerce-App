import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { password } = await request.json();

  try {
    // Step 1: Submit password to Shopify
    const passwordRes = await fetch(
      'https://kalles-5.myshopify.com/password',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          form_type: 'storefront_password',
          utf8: '✓',
          password: password,
        }),
        redirect: 'manual',
      }
    );

    // Step 2: Extract cookies from the response
    const setCookieHeader = passwordRes.headers.get('set-cookie');
    
    if (!setCookieHeader || passwordRes.status !== 302) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Step 3: Fetch products with the authenticated cookie
    const productsRes = await fetch(
      'https://kalles-5.myshopify.com/products.json',
      {
        headers: {
          Cookie: setCookieHeader,
        },
      }
    );

    if (!productsRes.ok) {
      throw new Error(`Failed to fetch products: ${productsRes.status}`);
    }

    const data = await productsRes.json();

    return NextResponse.json({
      success: true,
      products: data.products,
      cookie: setCookieHeader,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch products if already authenticated
export async function GET() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('storefront_digest');

  if (!sessionCookie) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    const res = await fetch('https://kalles-5.myshopify.com/products.json', {
      headers: {
        Cookie: `storefront_digest=${sessionCookie.value}`,
      },
    });

    const data = await res.json();
    return NextResponse.json(data.products);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}