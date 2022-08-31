"id": "8SE19554D2711812E",
    "status": "COMPLETED",
        "payment_source": {
    "paypal": {
        "email_address": "sb-bmssu20381809@personal.example.com",
            "account_id": "F8NJSW9UKDM3L",
                "name": {
            "given_name": "John",
                "surname": "Doe"
        },
        "phone_number": {
            "national_number": "2540712345678"
        },
        "address": {
            "address_line_1": "nairobi street",
                "address_line_2": "hse,200",
                    "admin_area_2": "Nairobi",
                        "admin_area_1": "Nairobi",
                            "postal_code": "00210",
                                "country_code": "KE"
        }
    }
},
"purchase_units": [
    {
        "reference_id": "default",
        "shipping": {
            "name": {
                "full_name": "John Doe"
            },
            "address": {
                "address_line_1": "nairobi street",
                "address_line_2": "hse,200",
                "admin_area_2": "Nairobi",
                "admin_area_1": "Nairobi",
                "postal_code": "00210",
                "country_code": "KE"
            }
        },
        "payments": {
            "captures": [
                {
                    "id": "64Y49618A9688273G",
                    "status": "COMPLETED",
                    "amount": {
                        "currency_code": "USD",
                        "value": "0.01"
                    },
                    "final_capture": true,
                    "seller_protection": {
                        "status": "ELIGIBLE",
                        "dispute_categories": [
                            "ITEM_NOT_RECEIVED",
                            "UNAUTHORIZED_TRANSACTION"
                        ]
                    },
                    "seller_receivable_breakdown": {
                        "gross_amount": {
                            "currency_code": "USD",
                            "value": "0.01"
                        },
                        "paypal_fee": {
                            "currency_code": "USD",
                            "value": "0.01"
                        },
                        "net_amount": {
                            "currency_code": "USD",
                            "value": "0.00"
                        }
                    },
                    "links": [
                        {
                            "href": "https://api.sandbox.paypal.com/v2/payments/captures/64Y49618A9688273G",
                            "rel": "self",
                            "method": "GET"
                        },
                        {
                            "href": "https://api.sandbox.paypal.com/v2/payments/captures/64Y49618A9688273G/refund",
                            "rel": "refund",
                            "method": "POST"
                        },
                        {
                            "href": "https://api.sandbox.paypal.com/v2/checkout/orders/8SE19554D2711812E",
                            "rel": "up",
                            "method": "GET"
                        }
                    ],
                    "create_time": "2022-08-30T10:08:58Z",
                    "update_time": "2022-08-30T10:08:58Z"
                }
            ]
        }
    }
],
    "payer": {
    "name": {
        "given_name": "John",
            "surname": "Doe"
    },
    "email_address": "sb-bmssu20381809@personal.example.com",
        "payer_id": "F8NJSW9UKDM3L",
            "phone": {
        "phone_number": {
            "national_number": "2540712345678"
        }
    },
    "address": {
        "address_line_1": "nairobi street",
            "address_line_2": "hse,200",
                "admin_area_2": "Nairobi",
                    "admin_area_1": "Nairobi",
                        "postal_code": "00210",
                            "country_code": "KE"
    }
},
"links": [
    {
        "href": "https://api.sandbox.paypal.com/v2/checkout/orders/8SE19554D2711812E",
        "rel": "self",
        "method": "GET"
    }
],
    "sys": {
    "links": {
        "jsBaseUrl": "https://www.paypalobjects.com/js",
            "cssBaseUrl": "https://www.paypalobjects.com/css",
                "templateBaseUrl": "https://www.paypalobjects.com/templates/KE/en",
                    "resourceBaseUrl": "https://www.paypalobjects.com",
                        "originalTemplateBaseUrl": "https://www.paypalobjects.com/templates"
    },
    "pageInfo": {
        "date": "Aug 30, 2022 03:08:57 -07:00",
            "hostName": "rZJvnqaaQhLn/nmWT8cSUm+72VQ7inHLJh0A5umvCfRWGdQgiILphL5VYcyWHO7P",
                "rlogId": "rZJvnqaaQhLn%2FnmWT8cSUgQSZmfvFci%2BjL4uti8MDqVFYqDp7YIQGszZ0fAFhdRkbIui9WXjAMUgd%2FNKo1ZuPS2S%2BxoggaAC_182ee39bdcc",
                    "script": "node",
                        "debug": null
    },
    "locality": {
        "timezone": {
            "determiner": "viaCowPrimary",
                "value": "America/Los_Angeles"
        },
        "country": "KE",
            "locale": "en_US",
                "language": "en",
                    "directionality": "ltr"
    },
    "tracking": {
        "fpti": {
            "name": "pta",
                "jsURL": "https://www.paypalobjects.com",
                    "serverURL": "https://t.paypal.com/ts",
                        "dataString": "pgrp=devdiscoverynodeweb%2F.dust&page=devdiscoverynodeweb%2F.dust&pgst=1661854137804&calc=f8161880cea8e&nsid=Jatw2F1UGDHLQMGvusEpXMQLiyBCWYNP&rsta=en_US&pgtf=Nodejs&env=live&s=ci&ccpg=KE&csci=dbfb5ef3b4c7462fbe052066949aeda0&comp=devdiscoverynodeweb&tsrce=checkoutjs&cu=1&gacook=2099183405.1661064025&pxpguid=b626012f1820ad00996b475bff8ced96&c_prefs=T%3D1%2CP%3D1%2CF%3D1%2Ctype%3Dexplicit_banner"
        }
    }
}