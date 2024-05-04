import { ref } from 'vue'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export function useCountDown() {
  const countDownText = ref('')

  function setCountDownInSeconds(sec: number, cb: () => void = () => {}) {
    const endTime = dayjs().add(sec, 'seconds').endOf('seconds')
    const countDownInterval = setInterval(() => {
      const currentTime = dayjs()
      const dur = dayjs.duration(endTime.diff(currentTime))
      const tempText = dur.format('mm:ss')
      countDownText.value = tempText
      if (tempText === '00:00') {
        clearInterval(countDownInterval)
        cb?.()
      }
    }, 1000)
  }

  return {
    setCountDownInSeconds,
    countDownText
  }
}
