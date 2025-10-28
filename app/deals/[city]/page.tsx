import { redirect } from 'next/navigation';

interface CityPageProps {
  params: Promise<{ city: string }>;
  searchParams: Promise<{ lang?: string }>;
}

export default async function CityPage({ params, searchParams }: CityPageProps) {
  const { city } = await params;
  const { lang = 'ar' } = await searchParams;
  
  // Redirect to homepage with city parameter
  redirect(`/?city=${city}&lang=${lang}`);
}
