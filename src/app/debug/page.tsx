export default function DebugPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">Debug Page</h1>
      <p className="mt-4">如果你能看到这个页面，说明 Next.js 应用正在运行！</p>
      <p className="mt-2">当前时间：{new Date().toLocaleString()}</p>
    </div>
  );
}
