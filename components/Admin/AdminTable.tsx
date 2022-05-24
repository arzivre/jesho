import { Table } from '@mantine/core'

interface AdmintableProps {
  headers: React.ReactNode
  rows: React.ReactNode
}
const AdminTable = ({headers, rows }: AdmintableProps) => {

  return (
    <Table highlightOnHover>
      <thead>{headers}</thead>
      <tbody>{rows}</tbody>
    </Table>
  )
}
export default AdminTable