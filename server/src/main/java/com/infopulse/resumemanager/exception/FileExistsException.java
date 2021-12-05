package com.infopulse.resumemanager.exception;

public class FileExistsException extends Exception{
    public FileExistsException(String fileName) {
        super("File "+ fileName +" is already exists");
    }
}
