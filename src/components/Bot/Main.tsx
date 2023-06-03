import List from './List'
import TextInput from './TextInput'

type Props = {
  //
}

const Main = (props: Props) => {

  return (
    <div className="flex-1 flex flex-col w-full overflow-hidden">
      <List></List>
      <TextInput></TextInput>
    </div>
  )
}

export default Main
