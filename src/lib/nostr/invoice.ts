import { getUser } from "./users";

export type Invoice = {
  status: string;
  verify: string;
  pr: string;
};

export async function createInvoice(
  destination: string,
  comment: string,
  amount: number
): Promise<Invoice | null> {
  const user = await getUser(destination);

  if (!user) {
    return null;
  }

  const ns = user.getLud16()?.split("@");

  if (!ns) {
    return null;
  }

  const lnurlp = await fetch(`https://${ns[1]}/.well-known/lnurlp/${ns[0]}`);

  if (!lnurlp.ok) {
    return null;
  }

  const lnData = await lnurlp.json();

  const callbackUrl = new URL(lnData.callback);

  const params = new URLSearchParams({
    ...Object.fromEntries(callbackUrl.searchParams),
    comment: comment,
    amount: Math.floor(amount * 1000).toString(),
  });

  const baseUrl = `${callbackUrl.protocol}//${callbackUrl.host}${callbackUrl.pathname}`;

  const invoiceRequest = await fetch(`${baseUrl}?${params}`);

  if (!invoiceRequest.ok) {
    return null;
  }

  return await invoiceRequest.json();
}
