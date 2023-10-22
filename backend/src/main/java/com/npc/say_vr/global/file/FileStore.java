package com.npc.say_vr.global.file;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileStore {

    private final String fileDir = "/var/www/profiles"; //
    //    "C:\\Users\\SSAFY\\Documents\\profile";
    //"/Users/limzzum";

    private String makeFolder() {

        String str = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
        String folderPath = str.replace("/", File.separator);

        File uploadPathFolder = new File(fileDir, folderPath);

        if (!uploadPathFolder.exists()) {
            uploadPathFolder.mkdirs();
        }
        return folderPath;
    }

    public String storeFile(MultipartFile multipartFile) {
        if (multipartFile == null) {
            return null;
        }

        String folderPath = makeFolder();
        String uuid = UUID.randomUUID().toString();
        String saveName = fileDir + File.separator + folderPath + File.separator + uuid + "-"
            + multipartFile.getOriginalFilename();

        try {
            multipartFile.transferTo(new File(saveName));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return folderPath + File.separator + uuid + "-" + multipartFile.getOriginalFilename();

    }

    public void deleteFile(String filePath) {
        File file = new File(fileDir + File.separator + filePath);
        System.out.println("filePath " + filePath);
        file.delete();
    }
}
