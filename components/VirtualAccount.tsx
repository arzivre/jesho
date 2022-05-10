import { Group, Text, Title } from '@mantine/core'
import { format, parseISO } from 'date-fns'

interface Props { 
  data: {
    bank_code: string
    name: string
    account_number: string
    expected_amount: number | string
    expiration_date: string
  }
}
const VirtualAccount = ({ data }: Props) => {
  return (
    <>
      <Group position='center' my={20}>
        <Title>Virtual Account Bank {data.bank_code}</Title>
      </Group>
      <Group position='apart' mb={20}>
        <Text>Name</Text>
        <Text size='xl' weight={500}>{data.name}</Text>
      </Group>
      <Group position='apart' mb={20}>
        <Text>Virtual Account Number</Text>
        <Text size='xl' weight={500}>{data.account_number}</Text>
      </Group>
      <Group position='apart' mb={20}>
        <Text>Total yang perlu dibayar</Text>
        <Text size='xl' weight={500}>Rp {data.expected_amount}</Text>
      </Group>
      <Group position='apart' mb={20}>
        <Text>Tangal Kadaluarsa</Text>
        <Text size='xl' weight={500}>
          {format(parseISO(data.expiration_date), 'dd MMM yyyy - HH:mm')}
        </Text>
      </Group>
    </>
  )
}
export default VirtualAccount
