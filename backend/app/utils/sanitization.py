import re

def sanitize_string(value: str) -> str:
    """Sanitizes user input string by stripping HTML tags and trimming whitespace.
    
    Limits potential injection or HTML/XSS issues in model prompt context.
    """
    if not value:
        return ""
    
    # Strip HTML tags
    clean = re.sub(r'<[^>]*>', '', value)
    
    # Strip common markdown control markers that might confuse prompting
    clean = clean.replace("```", "")
    
    # Remove control characters except newline and tab
    clean = "".join(ch for ch in clean if ch.isalnum() or ch.isspace() or ch in ".,?!-:;()[]{}@/\\_*+=%")
    
    return clean.strip()
