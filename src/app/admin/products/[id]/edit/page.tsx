import { EditProductView } from '@/modules/products';

export default async function EditProductPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  return <EditProductView id={id} />;
}
