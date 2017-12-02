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
				});
			}

			render() {
				if (this.state.error) {
					return (
						<Card className="my-4 p-4">
							<div>
								<h3>
									Error: {this.state.error.toString()}
								</h3>
								{
									this.state.errorInfo &&
									this.state.errorInfo.componentStack.split("\n").map(line => {
										return (
											<div key={line}>
												{line}
											</div>
										);
									})
								}
							</div>
						</Card>
					);
				} else {
					return <Child {...this.props} />;
				}
			}
		}
	}
}