def generate_story_prompt(story, guide, length):
    bot_info = "너는 이야기 생성 봇이야. "
    story_prompt = f"이전 이야기: {story}, " if story else ""
    guide_prompt = f"스토리 생성 가이드 및 주의점: {guide}, " if guide else ""
    
    base_prompt = f"{bot_info}{story_prompt}{guide_prompt}"
    
    length_prompt = "이전 이야기에 이어서 한 줄 짜리 이야기를 더해서 이야기를 마무리 지어줘." if length == 9 else "이미지에 어울리는 한 줄 짜리 재미있는 이야기를 만들어줘."

    return f"{base_prompt}{length_prompt}"

def generate_tag_prompt(story):
    return f"이야기 : {story}, 이야기를 나타낼 수 있는 한 가지 태그를 생성해줘."
