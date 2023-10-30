package com.ssafy.petdio.model.Enum;

import java.util.HashMap;
import java.util.Map;
import lombok.Getter;

@Getter
public enum Prompt {
    STICKER(1L, "(Sticker An adorable cute Bulldog in the photo that provided),Bulldog in the photo that provided, stickers, adorable, lovely, 3D vector art, cute and quirky, watercolor effect, bokeh, Adobe Illustrator , hand-drawn, digital painting, low-poly, low-lighting, bird's-eye view, isometric style, character-focused, 4K resolution, photorealistic rendering, using Cinema 4D,\n"
            + "sticker, cartoon Bulldog in the photo that provided sticker, all white background, Vermeer style, 12K, high quality, HD, octane render, cinematic lighting, sticker format, sticker shape", ""),
    HALLOWEEN(2L, "cute stickers, 8K Ultra HD, highly detailed, Detailed illustration of a cute schnauzer enjoying Halloween, with lots of pumpkins in the background, magic hat, style cartoon, two-dimensional, planar vector, character design, vector art, fantasy art, T-shirt design, Background with light brown gradient, Chibi Chara, Super Deformed Character, full body, Cute Design, Two-Dimensional, Character Design, Adorable Characters, Mascot Characters, Adobe Illustrator, soft tetrad color, A digital illustration of anime style , soft anime tones, luminism, Feeling like Kyoto Animation, pixiv, luminism, 3d render, octane render, Isometric, by yukisakura, awesome full color,",
            "negative_prompt\", \"nude, nsfw, text, letters, too many feet, too many fingers, \" +\n"
                    + "\"(((2 heads))), duplicate, abstract, disfigured, deformed, toy, figure, framed, disfigured, bad art, \" +\n"
                    + "\"deformed, poorly drawn, extra limbs, weird colors, 2 heads, long neck, elongated body, cropped image, \" +\n"
                    + "\"out of frame, draft, deformed hands, twisted fingers, double image, malformed hands, \" +\n"
                    + "\"multiple heads, extra limb, ugly, poorly drawn hands, missing limb, cut-off, over satured, grain, lowères,\" +\n"
                    + "\" bad anatomy, poorly drawn face, mutation, mutated, floating limbs, disconnected limbs,\" +\n"
                    + "\" out of focus, long body, disgusting, extra fingers, groos proportions, missing arms, mutated hands, \" +\n"
                    + "\"cloned face, missing legs,");

    private Long id;
    private String prompt;
    private String negativePrompt;

    private static final Map<Long, Prompt> enumIdMap = new HashMap<>();

    static {
        for (Prompt item : Prompt.values()) {
            enumIdMap.put(item.getId(), item);
        }
    }
    Prompt(Long id, String prompt, String negativePrompt) {
        this.id = id;
        this.prompt = prompt;
        this.negativePrompt = negativePrompt;
    }

    public static Prompt findEnumById(Long id) {
        return enumIdMap.get(id);
    }
}
