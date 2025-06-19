import {Moon, Sun} from "./icons";
import CommonHeaderIconBtn from "./common-header-icon-btn";
import {useTheme} from "next-themes";

function ToggleTheme() {
    const {setTheme, theme} = useTheme();
    
    return (
        <CommonHeaderIconBtn variant="theme" handleClick={() => {
            setTheme(theme === 'dark' ? 'light' : 'dark');
        }}>
            <Sun className="aspect-square w-6 scale-100 dark:hidden dark:scale-0"/>
            <Moon className="hidden aspect-square w-6 scale-0 dark:block dark:scale-100"/>
        </CommonHeaderIconBtn>
    )
}

export default ToggleTheme;