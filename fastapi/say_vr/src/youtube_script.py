from youtube_transcript_api import YouTubeTranscriptApi

def get_youtube_script(video_id):

    transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)
    transcript = transcript_list.find_transcript(['en'])

    script = transcript.fetch()

    for sentence in script:
        sentence['text'] = sentence['text'].replace('\n', ' ')

    return script;
