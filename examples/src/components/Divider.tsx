export default function Divider({ value = ' // ' }: { value?: string }) {
  return <span className="text-current opacity-40">{value}</span>
}
