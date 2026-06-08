import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { vbaDocumentsDescription } from './resources/vba-documents';

export class VaGovBenefits implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'va-gov-benefits',
		name: 'N8nDevVaGovBenefits',
		icon: { light: 'file:./va-gov-benefits.png', dark: 'file:./va-gov-benefits.dark.png' },
		group: ['input'],
		version: 1,
		subtitle: '={{\$parameter["operation"] + ": " + \$parameter["resource"]}}',
		description: 'Benefits Intake API allows authorized third-party systems used by Veteran Service Organizations (VSOs), agencies, and Veterans to digitally submit VA benefits claim documents directly to the Ve..',
		defaults: { name: 'va-gov-benefits' },
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'N8nDevVaGovBenefitsApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{\$credentials.url}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
		{
			"displayName": "Resource",
			"name": "resource",
			"type": "options",
			"noDataExpression": true,
			"options": [
				{
					"name": "VBA Documents",
					"value": "VBA Documents",
					"description": "VA Benefits document upload functionality"
				}
			],
			"default": ""
		},
		...vbaDocumentsDescription
		],
	};
}
