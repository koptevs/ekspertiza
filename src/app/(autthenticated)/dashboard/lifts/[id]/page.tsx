export default async function LiftPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return <div>Lift id: {id}</div>;
}
