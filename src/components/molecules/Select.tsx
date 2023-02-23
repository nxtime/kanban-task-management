import * as Select from '@radix-ui/react-select';

const ListSelect = ({
  title,
  options,
  selectedOption,
  setSelectedOption,
}: {
  title: string,
  options: string[],
  selectedOption: any,
  setSelectedOption(value: string): void,
}) => {
  return (
    <Select.Root value={selectedOption} onValueChange={setSelectedOption}>
      <Select.Trigger className="select-btn">
        <Select.Value placeholder={title} />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="select-content">
          <Select.ScrollUpButton />
          <Select.Viewport className="select-container">
            {options.map((option) => (
              <Select.Item key={option} value={option} className={selectedOption === option ? 'active' : ''}>
                <Select.ItemText>{option}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton />
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

export default ListSelect;
