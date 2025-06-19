import {Analytics} from './analytics';
import {Integrations} from './integrations';
import {Meta} from './meta';
import {Scripts} from './scripts';

type Props = {
    children: React.ReactNode;
};

export const Layout = ({children}: Props) => {
    return (
        <>
            <Meta/>
            <Scripts/>
            <div className="min-h-screen bg-white dark:bg-neutral-950">
                <main>{children}</main>
            </div>
            <Analytics/>
            <Integrations/>
            <script data-name="BMC-Widget" data-cfasync="false"
                    src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="anshulandnishank"
                    data-description="Support me on Buy me a coffee!"
                    data-message="Thank you for reading! Buy us a coffee if you'd like to support our work further."
                    data-color="#5F7FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>
        </>
    );
};
