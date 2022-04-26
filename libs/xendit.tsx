import Xendit from 'xendit-node'

const xendit = new Xendit({
  secretKey: process.env.XENDIT_SECRET_KEY,
})

export default xendit
