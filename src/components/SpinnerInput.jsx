import styles from "./SpinnerInput.module.css";

export const SpinnerInput = ({ 
    inputName, 
    value, 
    setValue,
    min = 0,
}) => {
    const handleClick = (number) => (event) => {
        event.preventDefault()
        validSetValue(parseInt(value ? value : 0) + number)
    }

    const validSetValue = (number) => {
        const newValue = parseInt(Math.max(0, number)).toString()
        setValue(newValue)
    }

    return (
        <div className={styles.spinner}>
            <button onClick={handleClick(-1)}>-</button>
            <input
                type="number"
                name={inputName}
                min={min.toString()}
                value={value}
                onChange={e => setValue(e.target.value)}
                onBlur={e => value ? validSetValue(e.target.value) : null} />
            <button onClick={handleClick(+1)}>+</button>
        </div>
    )
}