import type { ActionArgs } from "@remix-run/node";

interface Handlers {
  [key: string]: Function
}

export function handleActions (handlers: Handlers) {
  return async ({ request }: ActionArgs) => {
    const formData = await request.formData()
    const { _action, ...values } = Object.fromEntries(formData)

    console.log('Action: ', _action)
    const handlerFn = handlers[_action as string]

    if (!handlerFn) {
      throw new Error(`Unhandled action: ${_action}`)
    }

    return handlerFn(values)
  }
}
