import { SortableItem } from "../App"

interface CopyArrayProps {
  array: SortableItem[]
}

const copyArray = ({ array }: CopyArrayProps) => {
  return (
    <span style={{
        padding: "8px 12px",
        background: "#000",
        color: "white",
        borderRadius: "4px",
        whiteSpace: "nowrap"
      }}>[ {array.map((item) => (
        <span key={item.id}>{item.value}, </span>
      ))}]
    </span>
  )
}

export default copyArray