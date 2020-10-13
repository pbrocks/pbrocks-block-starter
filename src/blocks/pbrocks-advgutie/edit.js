// <------ Pulling in settings from Endpoint, Setting Up the inspector controls and Completing the settings form ------>
// <------------ edit.js ------------>

const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody, PanelRow, TextControl, Button, Spinner } = wp.components;
const { apiFetch } = wp;

function getSetting() {
  return apiFetch({
    path: "/jsforwpadvgb/v1/block-setting"
  })
    .then(blockSetting => blockSetting)
    .catch(error => error);
}

function setSetting(setting) {
  return apiFetch({
    path: "/jsforwpadvgb/v1/block-setting",
    method: "POST",
    body: setting
  })
    .then(blockSetting => blockSetting)
    .catch(error => error);
}

export default class Edit extends Component {
	state = {
	  blockSetting: "",
	  isLoading: true,
	  isSaving: false,
	  isEditing: false
	};
  
	updateSetting = async () => {
	  this.setState({ isSaving: true });
	  const blockSetting = await setSetting(this.state.blockSetting);
	  this.setState({
		blockSetting,
		isSaving: false,
		isEditing: false
	  });
	};
  
	async componentDidMount() {
	  const blockSetting = await getSetting();
	  this.setState({
		blockSetting,
		isLoading: false
	  });
	}
  
	render() {
	  const { className } = this.props;
  
	  if (this.state.isLoading) {
		return (
		  <p>
			<Spinner /> {__("Loading", "pbrocks-block-starter")}
		  </p>
		);
	  }
  
	  return (
		<Fragment>
		  <InspectorControls>
			<PanelBody
			  title={__("Block Setting", "pbrocks-block-starter")}
			  initialOpen
			>
			  <PanelRow>
				{this.state.isEditing || this.state.blockSetting === "" ? (
				  <p>
					<TextControl
					  label={__("Please enter a setting", "pbrocks-block-starter")}
					  value={this.state.blockSetting}
					  onChange={blockSetting => {
						if (!this.state.isSaving) {
						  this.setState({
							blockSetting,
							isEditing: true
						  });
						}
					  }}
					/>
					<Button
					  isPrimary
					  disabled={this.state.isSaving}
					  onClick={() => {
						this.updateSetting();
					  }}
					>
					  {__("Save Setting", "pbrocks-block-starter")}
					</Button>{" "}
					<Button
					  isDefault
					  disabled={this.state.isSaving}
					  onClick={async () => {
						this.setState({ isEditing: false });
						const blockSetting = await getSetting();
						this.setState({ blockSetting });
					  }}
					>
					  {__("Cancel", "pbrocks-block-starter")}
					</Button>
				  </p>
				) : (
				  <Fragment>
					<p>{__("Global Setting Saved", "pbrocks-block-starter")}</p>
					<Button
					  isDefault
					  onClick={() => {
						this.setState({
						  isEditing: true
						});
					  }}
					>
					  {__("Edit", "pbrocks-block-starter")}
					</Button>
				  </Fragment>
				)}
			  </PanelRow>
			</PanelBody>
		  </InspectorControls>
		  <div className={className}>
			{this.state.blockSetting === "" ? (
			  <p>
				{__(
				  "Please enter a block settings value in the block settings.",
				  "pbrocks-block-starter"
				)}
			  </p>
			) : (
			  <p>
				{__("Global Setting: ", "pbrocks-block-starter")}
				{this.state.blockSetting}
			  </p>
			)}
		  </div>
		</Fragment>
	  );
	}
}
