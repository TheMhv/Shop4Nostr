import { ShopInfo } from "@/components/home/ShopInfo";
import { getProductsFromShop, getShopMetadata } from "@/lib/nostr/market";
import { getUser } from "@/lib/nostr/users";

interface PageProps {
  params: Promise<{ npub: string }>;
}

export default async function StorePage({ params }: PageProps) {
  const { npub } = await params;

  const profile = await getUser(npub);

  if (!profile) {
    return <h1>This profile does not exist</h1>;
  }

  const shopMetadata = await getShopMetadata(npub);

  const products: string[] = [];
  const tags: string[] = [];

  const shopProducts = await getProductsFromShop(npub);
  await shopProducts.forEach((event) => {
    tags.push(...event.tags.hashtags());
    products.push(event.asJson());
  });

  return (
    <ShopInfo
      name={shopMetadata?.name || profile.getName()}
      description={shopMetadata?.about || profile.getAbout()}
      icon={shopMetadata?.ui.picture || profile.getPicture()}
      productsEvents={products}
    />
  );
}
