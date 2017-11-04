import * as React from "react"
import { Card } from "components";

export default function withErrorHandling() {

	return function(Child) {

		return class extends React.Component {
			constructor(props) {
				super(props);

				this.state = {
					error: null,
					errorInfo: null
				};
			}

			componentDidCatch(error, errorInfo) {
				this.setState({
					error,
					errorInfo
				})
			}

			render() {
				if (this.state.error) {
					return (
						<Card>
							{this.state.error}
							{this.state.errorInfo}
						</Card>
					)
				} else {
					return <Child />;
				}
			}
		}
	}
}