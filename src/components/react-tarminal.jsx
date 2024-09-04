import React, { useEffect , useContext} from 'react';
import { MyContext } from '../contextAPI';
import { Terminal } from 'primereact/terminal';
import { TerminalService } from 'primereact/terminalservice';
import { useSelector } from 'react-redux';

export default function TerminalDemo() {
    const { socket, code } = useContext(MyContext)
    // const onRun = () => { }// function for sending code to backend 
    const OutPut = useSelector((state) => state.Check.output);

    const commandHandlers = (text) => {
        TerminalService.emit('response', OutPut);
        console.log("command handler runs ")
        text ="run"
            

    };

    useEffect(() => {
        console.log("get")
        TerminalService.on('command', commandHandlers);

        return () => {
            TerminalService.off('command', commandHandlers);
        };
    }, [OutPut]);

    return (
        <div>
            <Terminal 
                prompt="Meheroon $" 
                pt={{
                    root: 'bg-white text-black px-2 pt-[1vh] border-y-2',
                    prompt: 'text-gray-400 mr-2',
                    command: 'text-primary-300',
                    response: 'text-red-300'
                }} 
                
            />
        </div>
    );
}
