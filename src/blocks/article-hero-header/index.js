//Register Depends
const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { ToggleControl, PanelBody, PanelRow, CheckboxControl, SelectControl, ColorPicker, Button, ResponsiveWrapper, FocalPointPicker } = wp.components;
const { Fragment } = wp.element;
const { withSelect } = wp.data;
const { __ } = wp.i18n;

//Import Icons
import icons from '../../../assets/icons/icons.js'

import './editor.scss';
import './styles.scss';

/**
 * Internal dependencies
 */
// import Edit from './edit';
// import save from './save';

//Setup Options
registerBlockType('pbrocks-block-starter/article-hero-header', {
	title: 'Article Hero Header',
	category: 'pbrocks-block-starter',
	icon: {
		"foreground": "rgba(224, 224, 224, 0.92)",
		"background": "rgba(11, 61, 145, 1)",
		"src": icons.chapterdivider
	},
	description: 'An immersive intro section for deluxe articles, featuring a headline and heroic image.',
	keywords: ['nasa', 'intro', 'fullwidth', 'featured'],
	supports: {
		align: ['full']
	},
	//Define json meta structure
	attributes: {
		align: {
			type: 'string',
			default: 'full'
		},	
		article_hero_heading: {
			type: 'string',
			default: 'An Astronaut’s Tips For Living in Space – Or Anywhere',
		},
		background_id: {
			type: 'number',
			default: 0
		},
		background_url: {
			type: 'string',
			default: 'https://nasa-gov-develop.go-vip.net/wp-content/uploads/2021/05/author-ann-mcclain.jpg'
		},
		focalpoint: {
			type: 'object',
			default: {focalPoint:{
				x: .50,
				y: .50,
			}},

		},
	},
	
	example: {
		attributes: {
			article_hero_heading: __( 'An Astronaut’s Tips For Living in Space – Or Anywhere', 'pbrocks-block-starter' ),
			background_id: __( '0', 'pbrocks-block-starter' ),
			background_url: __('https://nasa-gov-develop.go-vip.net/wp-content/uploads/2021/05/author-ann-mcclain.jpg', 'pbrocks-block-starter' ),
			color_mode: __( 'light', 'pbrocks-block-starter' ),
		},
	},
	edit: (props) => { 
		const { attributes, setAttributes } = props;
		const removeMedia = () => {
			props.setAttributes({
				background_id: 0,
				background_url: ''
			});
		}
		 const onSelectMedia = (media) => {
			props.setAttributes({
				background_id: media.id,
				background_url: media.url
			});
		}
		const blockStyle = {
			backgroundImage: attributes.background_url != '' ? 'url("' + attributes.background_url + '")' : 'none'
		};


		function setFocalPoint(args){
			props.setAttributes({
				focalpoint: args,
			});
		}


		const dimensions = {
			width: 400,
			height: 100,
		};


		const focalstyle = {
			backgroundImage: `url(${ attributes.background_url })`,
			backgroundPosition: `${ attributes.focalpoint.focalPoint.x * 100 }% ${ attributes.focalpoint.focalPoint.y * 100 }%`,
			backgroundSize: `cover!important`
		};

		const videofocalstyle = {
			objectPosition: `${ attributes.focalpoint.focalPoint.x * 100 }% ${ attributes.focalpoint.focalPoint.y * 100 }%`
		}

		function containsAny(str, substrings) {
			for (var i = 0; i != substrings.length; i++) {
			   var substring = substrings[i];
			   if (str.indexOf(substring) != - 1) {
				 return substring;
			   }
			}
			return null; 
		}
		
		
		const videoStyle = () => {
			var result = false;
			let html;
			result = containsAny(attributes.background_url, [".mp4", ".m4v", ".webm", ".ogv", ".wmv", ".flv"]);
			if (result == null){
				html = <div></div>;
			}else{
				html = <video className="wp-block-cover__video-background video-background" style={videofocalstyle} autoplay="" loop="true" muted="true" src={attributes.background_url}></video>
			}
			return html;
		}

		return (
			<div>
				{/* //Sidebar Controls */}
				<InspectorControls>
					{/* //Background Image */}
					<PanelBody
						title={__('Background Media', 'awp')}
						initialOpen={ true }
					>


						<PanelRow>

							<div className="editor-post-featured-image">

								<FocalPointPicker
									url={ attributes.background_url }
									dimensions={ dimensions }
									value={ attributes.focalpoint.focalPoint }
									onChange={ ( focalPoint ) => setFocalPoint( { focalPoint } ) }
								/>


								{attributes.background_url != 0 &&

									<MediaUploadCheck>
										<MediaUpload
											title={__('Replace Media', 'awp')}
											value={attributes.background_id}
											onSelect={onSelectMedia}
											allowedTypes={['image']}
											render={({open}) => (
												<Button onClick={open} isDefault islarge="true">{__('Replace Media', 'awp')}</Button>
											)}
										/>
									</MediaUploadCheck>
								}

							</div>

						</PanelRow>
					</PanelBody>
				</InspectorControls>


				{/* //Edit Content */}
				<section style={focalstyle} className="article-hero d-flex flex-align-center dark parallax-container" data-parallax="scroll" data-position="top" data-bleed="0" data-natural-width="1400" data-natural-height="900" data-speed="0.6">
					<div className="overlay-skrim d-flex flex-align-end">
						<div className="container">
							<div className="article-hero-content animation-fadeinup">
								<p className="subheading mt-0 mb-md">5 min read</p>
								<RichText
									tagName="h1"
									className="article-hero-heading"
									placeholder="Add a Heading"
									value={attributes.article_hero_heading}
									onChange={(newtext) => setAttributes({ article_hero_heading: newtext })}
								/>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	},
	save: (props) => {
		// return null;
		
		return (
			<div>
				<section style={focalstyle} className="article-hero d-flex flex-align-center dark parallax-container" data-parallax="scroll" data-position="top" data-bleed="0" data-natural-width="1400" data-natural-height="900" data-speed="0.6">
					<div className="overlay-skrim d-flex flex-align-end">
						<div className="container">
							<div className="article-hero-content animation-fadeinup">
								<p className="subheading mt-0 mb-md">5 min read</p>
								<RichText
									tagName="h1"
									className="article-hero-heading"
									placeholder="Add a Heading"
									value={attributes.article_hero_heading}
									onChange={(newtext) => setAttributes({ article_hero_heading: newtext })}
								/>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
});
