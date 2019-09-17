import { ObjectId } from "aws-sdk/clients/codecommit";

export interface category {
    "categories": [
        {
            '_id': ObjectId,
            'category': String,
            'image_url': String
        }
    ]
}