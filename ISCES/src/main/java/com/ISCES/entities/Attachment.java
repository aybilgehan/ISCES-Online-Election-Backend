package com.ISCES.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Attachment {

    @Id
    private Long id;
    private String fileType;

    @Lob
    private byte[]  data;
}
