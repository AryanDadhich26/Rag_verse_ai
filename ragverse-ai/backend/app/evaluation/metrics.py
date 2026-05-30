def calculate_latency_score(retrieval_time,generation_time):
    total=retrieval_time+generation_time
    if total<0.4:
        return 10
    elif total<0.5:
        return 8
    elif total<0.6:
        return 6
    elif total<0.8:
        return 4
    else:
        return 2