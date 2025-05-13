import Button from './Button';

export default function DeleteProject() {
    return <>
            <div className="flex flex-col items-center justify-center">
              <h2>Learning React</h2>
              <Button text='Delete'></Button>
            </div>
            <span>Some text...</span>
          </>
}