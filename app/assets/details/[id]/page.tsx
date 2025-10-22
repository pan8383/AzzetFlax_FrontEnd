'use client';

import { use, useCallback } from 'react';

type Params = {
  id: string;
};

type Props = {
  params: Promise<Params>;
};

export default function Home({ params }: Props) {
  const { id } = use(params);

  // const getAssets = useCallback(async () => {
  //   // const data = await fetchAssetDetail(id, page, fetchSize, sortField, sortDirection);
  // });

  return (
    <>
      <p>ID: {id}</p>
    </>
  );
}
