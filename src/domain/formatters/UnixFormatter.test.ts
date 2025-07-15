import { UnixFormatter } from '@/domain/formatters/UnixFormatter'

describe('UnixFormatter', () => {
  const fields = {
    minute: '*',
    hour: '*',
    dayOfMonth: null,
    month: '*',
    dayOfWeek: '*',
  }

  test('Should return object fully filled', () => {
    const formatter = new UnixFormatter()
    expect(formatter.format(fields)).toEqual('* * * * *')
  })
})
