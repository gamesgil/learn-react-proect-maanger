export default function Input({label, id, ref, ...props}) {
    return <>
        <label htmlFor={id}></label>
        <input id={id} ref={ref} {...props} type={props.type ?? 'text'} />
    </>
}