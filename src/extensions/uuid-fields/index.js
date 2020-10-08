/**
 * WordPress dependencies
 */
import { ExternalLink, PanelBody, TextControl } from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';

/**
 * External dependencies
 */
import {
	Disabled,
	ExtensionSidebar,
	IfPostType,
} from '@meredithcorp/onecms-components';
import { useMeta } from '@meredithcorp/onecms-utils';
import { css } from 'emotion';

/**
 * Sidebar for OneCMS/Uuid Fields.
 *
 * @return {Object} The sidebar.
 */
const UuidFieldsSidebar = () => {
	const [ uuidValue ] = useMeta( 'onecms_uuid_value' );
	const [ hyperDuration ] = useMeta( 'hyper_duration' );
	const [ legacyCmsId ] = useMeta( 'legacy_cms_id' );
	const [ legacyCmsTitle ] = useMeta( 'legacy_cms_title' );
	const [ legacyCmsPath ] = useMeta( 'url_path_alias' );
	const [ legacyPermalinkUrlPath ] = useMeta( 'legacy_permalink_url_path' );
	const [ legacyEntity ] = useMeta( 'legacy_entity' );
	const [ migrationRunUuid ] = useMeta( 'onecms_migration_run_uuid' );
	const [ prontoProvider ] = useMeta( 'onecms_pronto_provider' );

	const styles = {
		dashboardLink: css`
			display: block;
			margin-bottom: 1em;
		`,
	};

	return (
		<ExtensionSidebar
			icon="clipboard"
			name="onecms-uuid-fields"
			title="UUID Fields"
		>
			<PanelBody initialOpen={ true } >
				<Disabled>
					<TextControl
						label="Universal Unique ID"
						value={ uuidValue }
					/>
				</Disabled>
			</PanelBody>
			<PanelBody
				initialOpen={ true }
				title="Legacy Data"
			>
				<Disabled>
					<TextControl
						label="Legacy CMS ID"
						value={ legacyCmsId }
					/>
					<TextControl
						label="Legacy CMS Title"
						value={ legacyCmsTitle }
					/>
					<TextControl
						label="Legacy CMS Path"
						value={ legacyCmsPath }
					/>
					<TextControl
						label="Legacy CMS Permalink Path"
						value={ legacyPermalinkUrlPath }
					/>
					<TextControl
						label="Legacy Entity"
						value={ legacyEntity }
					/>
					<IfPostType types={ [ 'gallery', 'article' ] }>
						<TextControl
							label="Pronto Provider"
							value={ prontoProvider }
						/>
					</IfPostType>
				</Disabled>
			</PanelBody>
			<PanelBody
				initialOpen={ true }
				title="Migration Data"
			>
				<Disabled>
					<TextControl
						label="Migration Run UUID"
						value={ migrationRunUuid }
					/>
				</Disabled>

				{ !! migrationRunUuid && (
					<ExternalLink
						className={ styles.dashboardLink }
						href={ `https://data-pipeline-dashboard.cms.meredithcorp.io/run-details/${ migrationRunUuid }` }
					>
						View in Migration Dashboard
					</ExternalLink>
				) }

				<Disabled>
					<TextControl
						label="Hyper Migration Duration"
						value={ hyperDuration }
					/>
				</Disabled>
			</PanelBody>
		</ExtensionSidebar>
	);
};

registerPlugin( 'onecms-uuid', { render: UuidFieldsSidebar } );
