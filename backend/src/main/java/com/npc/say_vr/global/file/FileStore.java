package com.npc.say_vr.global.file;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileStore {

    private final String fileDir = "/var/www/profiles"; //

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

    public String storeBufferedImage(String imageUrl,String id) {
        if (imageUrl == null) {
            return null;
        }

        String folderPath = makeFolder();
        String uuid = UUID.randomUUID().toString();
        String fileName = uuid + "-" + id;
        String savePath = fileDir + File.separator + folderPath + File.separator + fileName;

        try (InputStream in = new URL(imageUrl).openStream()) {
            Path destination = Path.of(savePath);
            Files.copy(in, destination, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
        return folderPath + File.separator + fileName;

    }

//    private String getImageNameFromUrl(String imageUrl) {
//        int lastSlashIndex = imageUrl.lastIndexOf('?');
//        if (lastSlashIndex != -1) {
//            return imageUrl.substring(lastSlashIndex + 1);
//        }
//        return imageUrl;
//    }

    public void deleteFile(String filePath) {
        File file = new File(fileDir + File.separator + filePath);
        System.out.println("filePath " + filePath);
        file.delete();
    }
}
