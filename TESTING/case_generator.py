import re
import itertools

def extract_required_keys(url_template):
    """Extract unique replacement keys from the template."""
    pattern = r'<([^:>]+:[^>]+)>'
    placeholders = re.findall(pattern, url_template)
    # Extract the key (portion after colon) for each placeholder
    required_keys = []
    for ph in placeholders:
        if ':' in ph:
            _, key = ph.split(':', 1)
            if key not in required_keys:
                required_keys.append(key)
        else:
            if ph not in required_keys:
                required_keys.append(ph)
    return required_keys

def generate_urls(url_template, replacements):
    def replace_placeholder(match):
        # Extract the placeholder content (e.g., "int:channelId")
        placeholder = match.group(1)
        # Split based on ":" to get the actual key.
        if ':' in placeholder:
            _, key = placeholder.split(':', 1)
        else:
            key = placeholder
        # Replace if key exists in replacements; otherwise, leave unchanged.
        return str(replacements.get(key, match.group(0)))

    pattern = r'<([^:>]+:[^>]+)>'
    return re.sub(pattern, replace_placeholder, url_template)

# Test case setup
test_cases = {
    "channelId": [-100, -1, -4 ,-0, 1, 2, 3,  14, 15, 12 , 13, 20 ,2012 , 20000000000, 299999999999999999999],
    "packetToAdd": [-100, -1, -4 ,-0, 20, 0, 1, 2, 3,  12 ,100, 200],
    "uuid": [ 
        # real ones
        "1ca17ecc-b052-47d5-ab1b-c82ee67d0583",
        "8cc187f7-ef31-4fc4-86be-9a25d1193a86",
        "7a335ce4-6aee-4618-99ba-f0e9d86af161",
        "0d133184-6691-48ea-9ffa-80704182ccc6",
        "d0de1d6c-58d3-4a68-ac36-ddeaa394752f",
        "8f576b7b-b2e9-4265-85d2-eb7cef886c65",
        "30db9f49-1b47-4592-a20f-8d58021a9e37",
        "2486c405-992a-4360-858c-afe7b90e7489",
        # fake ones 
        "13c331e7-e2b8-489e-9e86-dac747bd6a07",
        "9a3de297-f774-4694-a02d-6ef8e100cd9b",
        "c20be8c1-26b4-4862-9dd0-23a97e788d05",
        "e5924d1e-beb4-49e3-a739-2a9478aa1486",
        "94147eeb-5896-4719-a3f7-ebd52fad9a65",
        "f6dd85ae-6ca6-4ed1-a534-0a6b6741fb22",
        "c2230a22-bd59-4db0-ae21-efa7cdc3182a",
        "bf93086a-ea14-48c7-af2c-5a9b2ebb4148",
        "68c7ca8c-dad1-4704-ba60-7165c2dd4331",
        "8f1980f8-27c0-4abc-83da-94b990c1e2fa",
        "10d103c4-dfae-48d5-9e2d-1d994d96a0ac",
        "c9125aab-c652-40b4-9a31-1f28ef4e9f33",
        "1ea09786-8ead-4abe-819c-4fd78e82585a",
        "3b69a104-71d2-4e16-bd97-42de6b261cfe",
        "e87a0703-8848-4737-abda-08fefd544c2b",
        "c6f1492d-5e5f-4a8b-a6f6-b4115e6dc93d",
        "04b82142-ddb2-4872-954a-33461f0e4ad3",
        "5a1bf73d-ebe1-452a-b9c1-98850fa4c06f",
        "eea8c968-7833-4907-9dfc-492d3c3472c9",
        "7a9e2d0a-684c-4954-9f03-7619196faf4c",
        ]
}

# URL templates
url_templates = [
    "chat/conversations/20/",
    "chat/conversations/update/<int:channelId>/20/<int:packetToAdd>/",
    "chat/conversation/<int:channelId>/20/",
    "chat/conversation/get_channel/<str:uuid>/"
]

generated_urls = []

# Process each template separately
for template in url_templates:
    required_keys = extract_required_keys(template)
    # If no required keys are found, simply add the template.
    if not required_keys:
        generated_urls.append(template)
    else:
        # Build a subset of test cases relevant to this template.
        relevant_test_cases = { key: test_cases[key] for key in required_keys if key in test_cases }

        # Create all combinations for the required keys while preserving the order.
        keys_order = list(relevant_test_cases.keys())
        combinations = list(itertools.product(*(relevant_test_cases[key] for key in keys_order)))

        for values in combinations:
            replacements = dict(zip(keys_order, values))
            generated_url = generate_urls(template, replacements)
            generated_urls.append(generated_url)

# Print all generated URLs.
for url in generated_urls:
    print(url)