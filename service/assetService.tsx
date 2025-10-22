import { fetchAssets } from '@/app/_api/asset/get/route';
import { AssetsResponse, SearchInput } from '@/types/assets';

export async function getAssets({
    search,
    page,
    size,
    sortField,
    sortDirection }: SearchInput): Promise<AssetsResponse> {

    const params = new URLSearchParams({
        search,
        page: page.toString(),
        size: size.toString(),
        sortField,
        sortDirection,
    });

    const res = await fetchAssets(`/api/assets?${params}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('データ取得に失敗しました');

    return res.json();
}
