import { Table } from '@mantine/core'

interface AdmintableProps {
  headers: React.ReactNode
  rows: React.ReactNode
}
const AdminTable = ({headers, rows }: AdmintableProps) => {
  // const rows = elements.map((element) => (
  //   <tr key={element.name}>
  //     <td>{element.position}</td>
  //     <td>{element.name}</td>
  //     <td>{element.symbol}</td>
  //     <td>{element.mass}</td>
  //   </tr>
  // ))
  // const header = (
  //   <tr>
  //     <th>Element position</th>
  //     <th>Element name</th>
  //     <th>Symbol</th>
  //     <th>Atomic mass</th>
  //   </tr>
  // )

  return (
    <Table>
      <thead>{headers}</thead>
      <tbody>{rows}</tbody>
    </Table>
  )
}
export default AdminTable