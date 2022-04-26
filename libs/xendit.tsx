import Xendit from 'xendit-node'

const xendit = new Xendit({
  secretKey: process.env.XENDIT_SECRET_KEY as string,
})

export default xendit
