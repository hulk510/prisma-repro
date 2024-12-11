import { Button } from './ui/button'

export function LoginButton(
  props: React.ComponentProps<typeof Button>,
) {
  return (
    <Button className='ui-bg-gradient-primary' {...props}>
      ログイン
    </Button>
  )
}
