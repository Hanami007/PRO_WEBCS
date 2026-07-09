export default function TestErrorPage() {
  throw new Error("This is a manual test error!");
  return <div>You shouldn&apos;t see this</div>;
}
