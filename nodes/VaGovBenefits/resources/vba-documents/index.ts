import type { INodeProperties } from 'n8n-workflow';

export const vbaDocumentsDescription: INodeProperties[] = [
		{
			"displayName": "Operation",
			"name": "operation",
			"type": "options",
			"noDataExpression": true,
			"displayOptions": {
				"show": {
					"resource": [
						"VBA Documents"
					]
				}
			},
			"options": [
				{
					"name": "Put Benefits Document Upload",
					"value": "Put Benefits Document Upload",
					"action": "Accepts document upload.",
					"description": "Accepts document metadata, document binary, and attachment binaries. Full URL, including\nquery parameters, provided from POST `/document_uploads`.\n\n## Example Payload\n\nThe following demonstrates a (redacted) multipart payload suitable for submitting to the PUT\nendpoint. Most programming languages should have provisions for assembling a multipart\npayload like this without having to do so manually.\n\n```\n--17de1ed8f01442b2a2d7a93506314b76\nContent-Disposition: form-data; name=\"metadata\"\nContent-Type: application/json\n\n{\"veteranFirstName\": \"Jane\",\n\"veteranLastName\": \"Doe\",\n\"fileNumber\": \"012345678\",\n\"zipCode\": \"97202\",\n\"source\": \"MyVSO\",\n\"docType\": \"21-22\"\n\"businessLine\": \"CMP\"}\n--17de1ed8f01442b2a2d7a93506314b76\nContent-Disposition: form-data; name=\"content\"\nContent-Type: application/pdf\n\n<Binary PDF contents>\n--17de1ed8f01442b2a2d7a93506314b76\nContent-Disposition: form-data; name=\"attachment1\"\nContent-Type: application/pdf\n\n<Binary PDF attachment contents>\n--17de1ed8f01442b2a2d7a93506314b76--\n```\n\nThis PUT request would have an overall HTTP Content-Type header:\n\n```\nContent-Type: multipart/form-data; boundary=17de1ed8f01442b2a2d7a93506314b76\n```\n\nNote that the Content-Disposition parameter \"name\" in each part must be the expected values\n\"metadata\", \"content\", \"attachment1\"...\"attachmentN\". The attachment attributes must be named \nexactly as they are listed here (case sensitive), for example: \"attachment_1\" or \"Attachment2\"\nare invalid.\n\nThis is an example curl command:\n\n```\ncurl -v -L -X PUT '<Location from \\uploads>' -F 'metadata=\"{\\\"veteranFirstName\\\": \\\"Jane\\\",\\\"veteranLastName\\\": \\\"Doe\\\",\\\"fileNumber\\\": \\\"012345678\\\",\\\"zipCode\\\": \\\"97202\\\",\\\"source\\\": \\\"MyVSO\\\",\\\"docType\\\": \\\"21-22\\\",\\\"businessLine\\\": \\\"CMP\\\"}\";type=application/json' -F 'content=@\"content.pdf\"' -F 'attachment1=@\"file1.pdf\"' -F 'attachment2=@\"another_file.pdf\"'\n```\n",
					"routing": {
						"request": {
							"method": "PUT",
							"url": "=/path"
						}
					}
				},
				{
					"name": "Post Benefits Document Upload",
					"value": "Post Benefits Document Upload",
					"action": "Get a location for subsequent document upload PUT request",
					"description": "Get a location for subsequent document upload PUT request",
					"routing": {
						"request": {
							"method": "POST",
							"url": "=/uploads"
						}
					}
				},
				{
					"name": "Get Benefits Document Upload Status Report",
					"value": "Get Benefits Document Upload Status Report",
					"action": "Get a bulk status report for a list of previous uploads",
					"description": "Get a bulk status report for a list of previous uploads",
					"routing": {
						"request": {
							"method": "POST",
							"url": "=/uploads/report"
						}
					}
				},
				{
					"name": "Post Benefits Document Upload Validate Document",
					"value": "Post Benefits Document Upload Validate Document",
					"action": "Validate an individual document against system file requirements",
					"description": "Using this endpoint will decrease the likelihood of errors associated with individual documents during\nthe submission process. Validations performed:\n* Document is a valid PDF (Note: `Content-Type` header value must be \"application/pdf\")\n* Document does not have a user password (an owner password is acceptable)\n* File size does not exceed 100 MB\n* Page size does not exceed 21\" x 21\"\n\nEach PDF document is sent as a direct file upload. The request body should contain nothing other than the document in\nbinary format. Binary multipart/form-data encoding is not supported. This endpoint does NOT validate metadata in JSON\nformat.\n\nThis endpoint does NOT initiate the claims intake process or submit data to that process. After using this endpoint,\nindividual PDF documents can be combined and submitted as a payload using PUT `/path`.\n\nA `200` response confirms that the individual document provided passes the system requirements.\n\nA `422` response indicates one or more problems with the document that should be resolved before submitting it in the\nfull document submission payload.\n",
					"routing": {
						"request": {
							"method": "POST",
							"url": "=/uploads/validate_document"
						}
					}
				},
				{
					"name": "Get Benefits Document Upload Status",
					"value": "Get Benefits Document Upload Status",
					"action": "Get status for a previous benefits document upload",
					"description": "Get status for a previous benefits document upload",
					"routing": {
						"request": {
							"method": "GET",
							"url": "=/uploads/{{$parameter[\"id\"]}}"
						}
					}
				},
				{
					"name": "Get Benefits Document Upload Download",
					"value": "Get Benefits Document Upload Download",
					"action": "Download zip of \"what the server sees\"",
					"description": "An endpoint that will allow you to see exactly what the server sees. We split apart all submitted docs and metadata and zip the file to make it available to you to help with debugging purposes. Files are deleted after 10 days. Only available in testing environments, not production.",
					"routing": {
						"request": {
							"method": "GET",
							"url": "=/uploads/{{$parameter[\"id\"]}}/download"
						}
					}
				}
			],
			"default": ""
		},
		{
			"displayName": "PUT /path",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"VBA Documents"
					],
					"operation": [
						"Put Benefits Document Upload"
					]
				}
			}
		},
		{
			"displayName": "Content MD 5",
			"name": "Content-MD5",
			"description": "Base64-encoded 128-bit MD5 digest of the message. Use for integrity control",
			"default": "",
			"type": "string",
			"routing": {
				"request": {
					"headers": {
						"Content-MD5": "={{ $value }}"
					}
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"VBA Documents"
					],
					"operation": [
						"Put Benefits Document Upload"
					]
				}
			}
		},
		{
			"displayName": "POST /uploads",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"VBA Documents"
					],
					"operation": [
						"Post Benefits Document Upload"
					]
				}
			}
		},
		{
			"displayName": "Apikey",
			"name": "security_apikey",
			"type": "string",
			"default": "",
			"description": "API key for apikey (header: apikey)",
			"required": false,
			"routing": {
				"request": {
					"headers": {
						"apikey": "={{ $value }}"
					}
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"VBA Documents"
					],
					"operation": [
						"Post Benefits Document Upload"
					]
				}
			}
		},
		{
			"displayName": "POST /uploads/report",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"VBA Documents"
					],
					"operation": [
						"Get Benefits Document Upload Status Report"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Ids",
			"name": "ids",
			"type": "json",
			"default": "[\n  \"6d8433c1-cd55-4c24-affd-f592287a7572\"\n]",
			"description": "List of IDs for previous document upload submissions",
			"routing": {
				"send": {
					"property": "ids",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"VBA Documents"
					],
					"operation": [
						"Get Benefits Document Upload Status Report"
					]
				}
			}
		},
		{
			"displayName": "Apikey",
			"name": "security_apikey",
			"type": "string",
			"default": "",
			"description": "API key for apikey (header: apikey)",
			"required": false,
			"routing": {
				"request": {
					"headers": {
						"apikey": "={{ $value }}"
					}
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"VBA Documents"
					],
					"operation": [
						"Get Benefits Document Upload Status Report"
					]
				}
			}
		},
		{
			"displayName": "POST /uploads/validate_document",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"VBA Documents"
					],
					"operation": [
						"Post Benefits Document Upload Validate Document"
					]
				}
			}
		},
		{
			"displayName": "GET /uploads/{id}",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"VBA Documents"
					],
					"operation": [
						"Get Benefits Document Upload Status"
					]
				}
			}
		},
		{
			"displayName": "Id",
			"name": "id",
			"required": true,
			"description": "ID as returned by a previous create upload request",
			"default": "6d8433c1-cd55-4c24-affd-f592287a7572",
			"type": "string",
			"displayOptions": {
				"show": {
					"resource": [
						"VBA Documents"
					],
					"operation": [
						"Get Benefits Document Upload Status"
					]
				}
			}
		},
		{
			"displayName": "Apikey",
			"name": "security_apikey",
			"type": "string",
			"default": "",
			"description": "API key for apikey (header: apikey)",
			"required": false,
			"routing": {
				"request": {
					"headers": {
						"apikey": "={{ $value }}"
					}
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"VBA Documents"
					],
					"operation": [
						"Get Benefits Document Upload Status"
					]
				}
			}
		},
		{
			"displayName": "GET /uploads/{id}/download",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"VBA Documents"
					],
					"operation": [
						"Get Benefits Document Upload Download"
					]
				}
			}
		},
		{
			"displayName": "Id",
			"name": "id",
			"required": true,
			"description": "ID as returned by a previous create upload request",
			"default": "6d8433c1-cd55-4c24-affd-f592287a7572",
			"type": "string",
			"displayOptions": {
				"show": {
					"resource": [
						"VBA Documents"
					],
					"operation": [
						"Get Benefits Document Upload Download"
					]
				}
			}
		},
		{
			"displayName": "Apikey",
			"name": "security_apikey",
			"type": "string",
			"default": "",
			"description": "API key for apikey (header: apikey)",
			"required": false,
			"routing": {
				"request": {
					"headers": {
						"apikey": "={{ $value }}"
					}
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"VBA Documents"
					],
					"operation": [
						"Get Benefits Document Upload Download"
					]
				}
			}
		},
];
