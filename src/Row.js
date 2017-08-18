import React from 'react';

class Row extends React.Component {
    constructor() {
        super();
        this.state = {
            status: 'idle',
            executed: 0,
            href: null,
        };
    }
    encode() {
        const {
            name,
            encoder,
            resource,
            dataType,
        } = this.props;
        const {
            executed,
        } = this.state;

        // put costy tasks at next tick to avoid frozen 'status'
        this.setState({ status: 'preparing' });
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(resource.getData(dataType));
            });
        }).then((data) => {
            this.setState({ status: 'running' });
            return new Promise((resolve) => {
                // put costy tasks at next tick to avoid frozen 'status'
                setTimeout(() => {
                    performance.mark(`encode-start-${name}-${executed}`);
                    resolve(encoder(data));
                });
            });
        }).then((blob) => {
            performance.mark(`encode-end-${name}-${executed}`);
            performance.measure(
                `encode-${name}-${executed}`,
                `encode-start-${name}-${executed}`,
                `encode-end-${name}-${executed}`,
            );
            this.setState((prevState) => ({
                status: 'done',
                executed: prevState.executed + 1,
                href: URL.createObjectURL(blob),
            }));
        });
    }
    render() {
        const {
            title,
            name,
        } = this.props;
        const {
            status,
            href,
        } = this.state;

        return (
            <tr>
                <td>{title}</td>
                <td>
                    <button onClick={() => this.encode()}>Encode</button>
                </td>
                <td>
                    {status === 'preparing' && ('Preparing...')}
                    {status === 'running' && ('Encoding...')}
                    {status === 'done' && (
                        <a
                            href={href}
                            download="testcase.mp3"
                        >
                            Download
                        </a>
                    )}
                </td>
            </tr>
        );
    }
}

export default Row;
