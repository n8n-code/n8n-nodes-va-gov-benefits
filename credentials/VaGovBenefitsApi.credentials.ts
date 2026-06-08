import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class VaGovBenefitsApi implements ICredentialType {
	name = 'N8nDevVaGovBenefitsApi';

	displayName = 'va-gov-benefits API';

	icon: Icon = { light: 'file:../nodes/VaGovBenefits/va-gov-benefits.png', dark: 'file:../nodes/VaGovBenefits/va-gov-benefits.dark.png' };

	documentationUrl = '';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'url',
			type: 'string',
			default: '',
			required: true,
			placeholder: 'https://sandbox-api.va.gov/services/vba_documents/v1',
			description: 'The base URL of your va-gov-benefits API server',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: false,
		},
		{
			"displayName": "❤️ Keep It Moving: One developer built a tool that auto-generates n8n nodes from any OpenAPI spec. Your donation funds new features, more API support, and better tooling for every developer after you. <a href=\"https://n8n-code.github.io/membership/#/eyJ0aXRsZSI6IktlZXAgSXQgTW92aW5nIiwiZGVzYyI6Ik9uZSBkZXZlbG9wZXIgYnVpbHQgYSB0b29sIHRoYXQgYXV0by1nZW5lcmF0ZXNcbm44biBub2RlcyBmcm9tIGFueSBPcGVuQVBJIHNwZWMuXG5cbllvdXIgZG9uYXRpb24gZnVuZHMgbmV3IGZlYXR1cmVzLCBtb3JlIEFQSSBzdXBwb3J0LFxuYW5kIGJldHRlciB0b29saW5nIGZvciBldmVyeSBkZXZlbG9wZXIgYWZ0ZXIgeW91LiIsInRhcmdldCI6NTAwMCwiYWRkcmVzc2VzIjp7ImV0aGVyZXVtIjoiMHhmMDU1NWQ0MGRiRkI0ZTNCZjA3MDQ0MjgyQjc4RjJmRTFmNTFFZjcyIiwic29sYW5hIjoiNlpEVk5BYmpZZExEcXo4cGt3VUNHYllaNVV3QlFranB0QzU1Wk5vTFcybVUifSwiZGlzY29yZCI6Imh0dHBzOi8vZGlzY29yZC5nZy9wdERaOGU0aDkzIn0\" target=\"_blank\">☕ Buy me a coffee</a>",
			"name": "n8nCodeNotice",
			"type": "notice",
			"default": "",
			"displayOptions": {
				"show": {}
			}
		}
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'apikey': '={{$credentials.apiKey}}',
			},
		},
	};


}
