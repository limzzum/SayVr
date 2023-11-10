package com.npc.say_vr.domain.user.repository.activityRepository;

import com.npc.say_vr.domain.user.domain.Activity;
import com.npc.say_vr.domain.user.dto.ActivityDto;
import java.time.LocalDate;
import java.util.List;

public interface ActivityRepository {

  void save(Activity activity);
  List<ActivityDto> readActvityYear(Long userId, LocalDate today);

}
